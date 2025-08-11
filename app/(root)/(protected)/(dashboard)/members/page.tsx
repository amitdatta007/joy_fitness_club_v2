import { getMembers } from '@/actions/memberAction';
import Members from '@/components/pages/main/members/members';
import { MemberSchemaType } from '@/schema/member.schema';

const MembersPage = async() => {
    const members: MemberSchemaType[] = await getMembers();

    return (
        <Members members={members} />
    );
};

export default MembersPage;