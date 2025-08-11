import { getMembers } from '@/actions/memberAction';
import DeletedMembers from '@/components/pages/main/members/deleted-members';
import { MemberSchemaType } from '@/schema/member.schema';

const MembersPage = async() => {
    const members: MemberSchemaType[] = await getMembers('deleted');

    console.log(members)

    return (
        <DeletedMembers members={members} />
    );
};

export default MembersPage;