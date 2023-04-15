import { type NextPage } from "next";
import Head from "next/head";
import { Room } from "~/components/room";
import {
  ApplicationSettingsProvider,
  type ApplicationSettings,
} from "~/providers";
import { getSettingsConstants } from "~/server/api/config";

interface RoomPageProps {
  settings: ApplicationSettings;
}

const RoomPage: NextPage<RoomPageProps> = ({ settings }) => {
  return (
    <>
      <Head>
        <title>Chat Room</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#082f49] to-[#0f172a]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <ApplicationSettingsProvider defaultStateOverride={settings}>
            <Room />
          </ApplicationSettingsProvider>
        </div>
      </main>
    </>
  );
};

RoomPage.getInitialProps = () => {
  const settings = getSettingsConstants();
  return { settings: settings };
};

export default RoomPage;
