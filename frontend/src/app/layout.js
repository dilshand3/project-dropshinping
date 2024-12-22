import "./globals.css";
const FavIcon = "/Images/Favicon.png";

export const metadata = {
  title: "3ELEMENT",
  description: "FASHION IS HERE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={FavIcon} type="image/x-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
