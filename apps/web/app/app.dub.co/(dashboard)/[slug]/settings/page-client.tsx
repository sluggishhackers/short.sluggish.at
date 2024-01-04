"use client";

import useProject from "@/lib/swr/use-project";
import DeleteProject from "@/ui/projects/delete-project";
import UploadLogo from "@/ui/projects/upload-logo";
import { Form } from "@dub/ui";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "swr";

export default function ProjectSettingsClient() {
  const router = useRouter();
  const { name, slug, plan, isOwner } = useProject();

  return (
    <>
      <Form
        title="프로젝트명"
        description={`This is the name of your project on ${process.env.NEXT_PUBLIC_APP_NAME}.`}
        inputData={{
          name: "name",
          defaultValue: name,
          placeholder: "새 프로젝트",
          maxLength: 32,
        }}
        helpText="Max 32 characters."
        {...(plan === "enterprise" &&
          !isOwner && {
            disabledTooltip: "프로젝트 소유자만 이름을 변경할 수 있습니다.",
          })}
        handleSubmit={(updateData) =>
          fetch(`/api/projects/${slug}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }).then(async (res) => {
            if (res.status === 200) {
              await Promise.all([
                mutate("/api/projects"),
                mutate(`/api/projects/${slug}`),
              ]);
              toast.success("프로젝트 이름이 변경되었습니다!");
            } else if (res.status === 422) {
              toast.error("이미 존재하는 slug 입니다.");
            } else {
              const errorMessage = await res.text();
              toast.error(errorMessage || "무언가 잘못되었습니다.");
            }
          })
        }
      />
      <Form
        title="프로젝트 Slug"
        description={`This is your project's unique slug on ${process.env.NEXT_PUBLIC_APP_NAME}.`}
        inputData={{
          name: "slug",
          defaultValue: slug,
          placeholder: "new-project",
          pattern: "^[a-z0-9-]+$",
          maxLength: 48,
        }}
        helpText="최대 48자 이내, 영문 소문자, 숫자, - 조합으로만 가능합니다."
        {...(plan === "enterprise" &&
          !isOwner && {
            disabledTooltip: "프로젝트 소유자만 이름을 변경할 수 있습니다.",
          })}
        handleSubmit={(data) =>
          fetch(`/api/projects/${slug}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (res) => {
            if (res.status === 200) {
              const { slug: newSlug } = await res.json();
              await mutate("/api/projects");
              router.push(`/${newSlug}/settings`);
              toast.success("프로젝트 Slug가 변경되었습니다!");
            } else {
              const error = await res.text();
              toast.error(error || "무언가 잘못되었습니다.");
            }
          })
        }
      />
      <UploadLogo />
      <DeleteProject />
    </>
  );
}
