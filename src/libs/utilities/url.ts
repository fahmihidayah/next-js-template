import { GetServerSidePropsContext } from "next";
import { authProvider } from "../provider/auth";
import { LOGIN_URL } from "../configuration/url";
export interface ProtectUrlParams {
    context: GetServerSidePropsContext;
    nextURL : string;
}

export const protectUrl = async (
    { context, nextURL }: ProtectUrlParams
) : Promise<any | undefined> => {
    const user = await authProvider.getIdentity(context);

    if (!user) {
        return {
            props: {},
            redirect: {
                destination: `/${LOGIN_URL}?to=${encodeURIComponent(nextURL)}`,
                permanent: false,
            },
        };
    }
}