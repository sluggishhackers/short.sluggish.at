import { BlurImage } from "@/ui/shared/blur-image";

export default function NoLinksPlaceholder({
  AddEditLinkButton,
}: {
  AddEditLinkButton: () => JSX.Element;
}) {
  return (
    <div className="mb-12 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
      <h2 className="z-10 text-xl font-semibold text-gray-700">
        목록 없음
        {/* No links found. */}
      </h2>
      <BlurImage
        src="/_static/illustrations/call-waiting.svg"
        // alt="No links yet"
        alt="목록 없음"
        width={400}
        height={400}
        className="pointer-events-none -my-8"
      />
      <AddEditLinkButton />
      <p className="mt-2 text-sm text-gray-500">
        혹은 검색어를 수정해보세요
        {/* or edit your search filters */}
      </p>
    </div>
  );
}
