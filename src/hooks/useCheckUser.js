import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'

const useCheckUser = () => {
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        if (!user?.email) {
            router.push("/auth/login");
        }
    }, [user, router]);
};

export default useCheckUser;
