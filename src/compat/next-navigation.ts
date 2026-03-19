import { useLocation, useNavigate } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  return {
    push: (to: string) => navigate(to),
    replace: (to: string) => navigate(to, { replace: true }),
    back: () => window.history.back(),
    refresh: () => window.location.reload(),
  };
}

export function usePathname() {
  return useLocation().pathname;
}

export function redirect(to: string) {
  window.location.assign(to);
}
