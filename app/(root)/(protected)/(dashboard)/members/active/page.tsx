import { getMembers } from '@/actions/memberAction';
import ActiveMembers from '@/components/pages/main/members/active-members';
import { MemberSchemaType } from '@/schema/member.schema';

const MembersPage = async() => {
    const members: MemberSchemaType[] = await getMembers('active');

    return (
        <ActiveMembers members={members} />
    );
};

export default MembersPage;