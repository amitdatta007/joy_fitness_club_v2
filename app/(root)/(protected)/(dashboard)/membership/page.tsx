import { getMembers } from '@/actions/memberAction';
import { getMembershipFees, MembershipFeeWithMemberType } from '@/actions/membershipAction';
import Members from '@/components/pages/main/members/members';
import Membership from '@/components/pages/main/membership/membership';
import { MemberSchemaType } from '@/schema/member.schema';

const MembershipPage = async() => {
    const fees: MembershipFeeWithMemberType[] = await getMembershipFees();

    return (
        <Membership fees={fees} />
    );
};

export default MembershipPage;