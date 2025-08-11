import { getMembers } from '@/actions/memberAction';
import InactiveMembers from '@/components/pages/main/members/inactive-members';
import { MemberSchemaType } from '@/schema/member.schema';

const MembersPage = async() => {
    const members: MemberSchemaType[] = await getMembers('inactive');

    return (
        <InactiveMembers members={members} />
    );
};

export default MembersPage;