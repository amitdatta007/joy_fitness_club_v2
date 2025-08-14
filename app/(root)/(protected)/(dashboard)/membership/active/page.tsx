import { getActiveMembershipFees, MembershipFeeWithMemberType } from '@/actions/membershipAction';
import ActiveMembership from '@/components/pages/main/membership/active-membership';

const ActiveMembershipPage = async() => {
    const fees: MembershipFeeWithMemberType[] = await getActiveMembershipFees();

    return (
        <ActiveMembership fees={fees} />
    );
};

export default ActiveMembershipPage;