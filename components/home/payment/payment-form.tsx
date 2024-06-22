"use client"

import { GET_SCOUT } from "@/actions/scout.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GET_FEE_BY_TITLE } from "@/actions/fee.action";
import { APPLY_COUPON } from "@/actions/coupon.action";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { GENERATE_BKASH_TOKEN } from "@/services/bkash.service";
import axios from "axios"

interface PaymentFormProps {
    scoutId: string;
}

export const PaymentForm = ({ scoutId }: PaymentFormProps) => {
    const [fee, setFee] = useState<number>(500)
    const [coupon, setCoupon] = useState<string>("")
    const [open, setOpen] = useState<boolean>(true)

    const {data:regFee} = useQuery({
        queryKey: ["scout-payment-fee"],
        queryFn: async () => {
            const res = await GET_FEE_BY_TITLE("registration")
            return res.fee
        }
    })

    const {data:scout} = useQuery({
        queryKey: ['payment-scout'],
        queryFn: async () => {
            const res = await GET_SCOUT(scoutId)
            return res.scout
        },
        enabled: !!scoutId
    })

    const {mutate: applyCoupon, isPending} = useMutation({
        mutationFn: APPLY_COUPON,
        onSuccess: (data) => {
            setFee(fee - data?.value < 0 ? 0 : fee - data?.value)
            setOpen(false)
            toast.success("Coupon applied", {
                id: "apply-coupon"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "apply-coupon"
            });
        }
    })

    const handleApply = () => {
        toast.loading("Coupon applying...", {
            id: "apply-coupon"
        })
        applyCoupon(coupon)
    }

    useEffect(() => {
        if (scout?.apsId && regFee) {
            setFee(regFee.discountAmount);
        } else {
            setFee(regFee?.amount || 500);
        }
    }, [scout?.apsId, regFee])

    const createPayment = async () => {
        const {data} = await axios.post("/api/payment/register", {
            token: localStorage.getItem("token"),
            scoutId: scout?.id,
            amount: fee
        })
        console.log(data)
    }

    const {mutate: generateToken} = useMutation({
        mutationFn: GENERATE_BKASH_TOKEN,
        onSuccess: (data) => {
            console.log(data?.success)
            if (data?.token) {
                localStorage.setItem("bkash_token", data?.token)
                createPayment()
            }
        }
    })

    const handlePay = () => {
        generateToken()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl">Your payment amount is <span className="text-2xl font-bold text-primary">&#2547;{fee}</span></h1>
            <Collapsible open={open}>
                <CollapsibleContent>
                    <div className="flex items-center gap-x-2">
                        <Input type="text" placeholder="Appply Coupon Code" className="flex-1" onChange={(e) => setCoupon(e.target.value)} />
                        <Button disabled={!coupon || isPending} onClick={handleApply}>Apply</Button>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Button onClick={handlePay}>Pay with Bkash</Button>
        </div>
    )
}