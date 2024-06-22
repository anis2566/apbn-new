import { AssignCouponModal } from "@/components/dashboard/modal/assign-coupon.modal"
import { AssignFeeModal } from "@/components/dashboard/modal/assign-fee.modal"
import { DeleteCouponModal } from "@/components/dashboard/modal/coupon.modal"
import { DeleteFeeModal } from "@/components/dashboard/modal/fee.modal"
import { DeleteUnitModal } from "@/components/dashboard/modal/unit.modal"
import { UpdateCouponModal } from "@/components/dashboard/modal/update-coupon.modal"
import { UpdateFeeModal } from "@/components/dashboard/modal/update-fee.modal"

export const ModalProvider = () => {
    return (
        <>
            <DeleteUnitModal />
            <AssignFeeModal />
            <UpdateFeeModal />
            <DeleteFeeModal />
            <AssignCouponModal />
            <UpdateCouponModal />
            <DeleteCouponModal />
        </>
    )
}