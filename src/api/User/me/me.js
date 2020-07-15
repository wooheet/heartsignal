import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

/**
  Computed Fields in Prisma
  prima에 쿼리를 한 값이 없을 경우 서버에서 User를 찾아 쿼리를 한다.
  resolver된 함수에는 parent를 파라미터로 담고 있는대
  그 상위에는 user를 담고 있는 field에서 fullName을
  완성 시킬 수 있는 first name과 last name을 추출하여 full name을 만든다.
 */
export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile,
                posts
            };
        }
    },
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
};