import { prisma } from "../../../generated/prisma-client";

/**
 Computed Fields in Prisma
 prima에 쿼리를 한 값이 없을 경우 서버에서 User를 찾아 쿼리를 한다.
 resolver된 함수에는 parent를 파라미터로 담고 있는대
 그 상위에는 user를 담고 있는 field에서 fullName을
 완성 시킬 수 있는 first name과 last name을 추출하여 full name을 만든다.
 */
export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};