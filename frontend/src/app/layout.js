import "./globals.css";
const logoImage = "/Images/3elementlogo.png";
const CartIcon = "/Icons/CartIcon.png";
const UserIcon = "/Icons/UserIcon.png";
const SearchIcon = "/Icons/SearchIcon.png"

export const metadata = {
  title: "3ELEMENT",
  description: "FASHION IS HERE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Images/3elementlogo.png" type="image/x-icon" />
      </head>
      <body>
        {children}
        <img src={logoImage} height={20} width={20} alt="" />
        <img src={UserIcon} height={20} width={20} alt="" />
        <img src={CartIcon} height={20} width={20} alt="" />
        <img src={SearchIcon} height={20} width={20} alt="" />
      </body>
    </html>
  );
}
