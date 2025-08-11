import { getMonthlyMembers } from '@/actions/memberAction';
import Members from '@/components/pages/main/members/members';
import NewMembers from '@/components/pages/main/members/new-members';
import { MemberSchemaType } from '@/schema/member.schema';

const MembersPage = async() => {
    const members: MemberSchemaType[] = await getMonthlyMembers();

    return (
        <NewMembers members={members} />
    );
};

export default MembersPage;