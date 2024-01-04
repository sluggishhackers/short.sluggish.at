import { DUB_LOGO } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

export default function LoginLink({
  email = "panic@thedis.co",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
}: {
  email: string;
  url: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>slg.sh 로그인 링크</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_LOGO}
                width="40"
                height="40"
                alt="Dub"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              로그인 링크
            </Heading>
            <Text className="text-sm leading-6 text-black">
              slg.sh 로그인 링크를 보내드립니다.
            </Text>
            <Text className="text-sm leading-6 text-black">
              아래 로그인 버튼을 클릭하여 slg.sh 로그인을 진행해주세요.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                로그인
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              버튼이 눌리지 않거나 동작하지 않는다면 아래 주소를 복사하여
              브라우저 창에 직접 붙여넣어주세요.
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
