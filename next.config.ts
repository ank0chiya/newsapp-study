import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 通常は 'https'
        hostname: 'ichef.bbci.co.uk',
        port: '', // オプション: 必要なら指定 (例: '3000')。デフォルトは全ポート
        pathname: '/**', // オプション: 任意のパスを許可。必要なら '/news/**' のように具体的に指定
      },
      {
        protocol: 'https', // 通常は 'https'
        hostname: '*',
        port: '', // オプション: 必要なら指定 (例: '3000')。デフォルトは全ポート
        pathname: '/**', // オプション: 任意のパスを許可。必要なら '/news/**' のように具体的に指定
      },
      // 他にも許可したいドメインがあれば、ここに追加します
      // {
      //   protocol: 'https',
      //   hostname: 'another-domain.com',
      // },
    ],
  },
};

export default nextConfig;
