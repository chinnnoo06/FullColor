import { logout } from '@/actions/auth/logout.action';
import { BulletHex } from '@/components/ui/BulletHex';
import { ADMIN_LOGOUT } from '@/utils/data/navigation';

export const LogoutButton = () => {
    const handleLogout = async () => {
        await logout();
    }

    return (
        <button
            onClick={handleLogout}
            className="border-fourth/30 group mt-auto flex w-full cursor-pointer items-center gap-5 border-t px-5 py-5 transition-colors duration-300"
        >
            <span className="font-barlow flex-1 text-left text-lg leading-none font-medium uppercase text-red-500 transition-colors duration-300 group-hover:text-red-400">
                {ADMIN_LOGOUT.label}
            </span>

            <BulletHex className="fill-red-500/30 transition-colors duration-300 group-hover:fill-red-500" />
        </button>
    );
};
