"use client";

import { Button } from "@dub/ui";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [email, setEmail] = useState("");
  const [clickedEmail, setClickedEmail] = useState(false);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setClickedEmail(true);
          signIn("email", {
            email,
            redirect: false,
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          })
            .then((res) => {
              if (res?.ok && !res?.error) {
                setEmail("");
                toast.success("이메일 발송 완료! - 수신함을 확인해보세요!");
              } else {
                toast.error("이메일을 보내는 중에 오류가 발생했습니다.");
              }
            })
            .catch(() => {
              setClickedEmail(false);
              toast.error("이메일을 보내는 중에 오류가 발생했습니다.");
            });
        }}
        className="flex flex-col space-y-3"
      >
        <div>
          <div className="mb-4 mt-1 border-t border-gray-300" />
          <input
            id="email"
            name="email"
            autoFocus
            type="email"
            placeholder="hoony@slg.sh"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <Button text="회원가입" variant="secondary" loading={clickedEmail} />
      </form>
      <p className="text-center text-sm text-gray-500">
        이미 계정을 가지고 계신가요?{" "}
        <Link
          href="/login"
          className="font-semibold text-gray-500 transition-colors hover:text-black"
        >
          로그인
        </Link>
        .
      </p>
    </>
  );
}
