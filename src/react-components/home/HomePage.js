import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage, addLocaleData } from "react-intl";
import { lang, messages } from "../../utils/i18n";
import en from "react-intl/locale-data/en";
import classNames from "classnames";
import configs from "../../utils/configs";
import { Page } from "../layout/Page";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import queryString from "querystring";
import SignInDialog from "../sign-in-dialog.js";

import backgroundAudio from "../../assets/gorloj-nagrume.mp3";
// import splashWebm from "../../assets/video/splash2.webm";
// import splashMp4 from "../../assets/video/splash2.mp4";
// import aug20Image from "../../assets/images/aug22.gif";
// import aug20ImageWebp from "../../assets/images/aug22.webp";

// import loginButton from "../../assets/images/login-button.png";
// import loginButtonWebp from "../../assets/images/login-button.webp";
// import loginButtonHover from "../../assets/images/login-button-hover.png";
// import loginButtonHoverWebp from "../../assets/images/login-button-hover.webp";

// import logoImage from "../../assets/images/logo.png";
// import logoImageWebp from "../../assets/images/logo.webp";

// import enterButton from "../../assets/images/enter-button.gif";
// import enterButtonHover from "../../assets/images/enter-button-hover.gif";

// import logoutButton from "../../assets/images/logout-button.png";
// import logoutButtonWebp from "../../assets/images/logout-button.webp";

// import logoutButtonHover from "../../assets/images/logout-button-hover.png";
// import logoutButtonHoverWebp from "../../assets/images/logout-button-hover.webp";

import getRoomMetadata from "../../room-metadata";

import qsTruthy from "../../utils/qs_truthy";

import mainMenuBack from "../../assets/images/main-menu/menu-back.png";
import aboutHover from "../../assets/images/main-menu/about-hover.png";
import aboutNormal from "../../assets/images/main-menu/about-normal.png";
import creditHover from "../../assets/images/main-menu/credits-hover.png";
import creditNormal from "../../assets/images/main-menu/credits-normal.png";
import loginHover from "../../assets/images/main-menu/login-normal.png";
import loginNormal from "../../assets/images/main-menu/login-hover.png";

import bcHover from "../../assets/images/main-menu/bc-hover.png";
import bcNormal from "../../assets/images/main-menu/bc-normal.png";
import fbHover from "../../assets/images/main-menu/fb-hover.png";
import fbNormal from "../../assets/images/main-menu/fb-normal.png";
import scHover from "../../assets/images/main-menu/sc-hover.png";
import scNormal from "../../assets/images/main-menu/sc-normal.png";
const splashMp4 = "https://str33m.dr33mphaz3r.net/static-assets/splash2.mp4";
const splashWebm = "https://str33m.dr33mphaz3r.net/static-assets/splash2.webm";

const aug20Image = "https://str33m.dr33mphaz3r.net/static-assets/aug22.gif";
const aug20ImageWebp = "https://str33m.dr33mphaz3r.net/static-assets/aug22.webp";

const loginButton = "https://str33m.dr33mphaz3r.net/static-assets/login-button.png";
const loginButtonWebp = "https://str33m.dr33mphaz3r.net/static-assets/login-button.webp";
const loginButtonHover = "https://str33m.dr33mphaz3r.net/static-assets/login-button-hover.png";
const loginButtonHoverWebp = "https://str33m.dr33mphaz3r.net/static-assets/login-button-hover.webp";

const logoImage = "https://str33m.dr33mphaz3r.net/static-assets/LineUptrial05h.png";
const logoImageWebp = "https://str33m.dr33mphaz3r.net/static-assets/LineUptrial05h.webp";

const enterButton = "https://str33m.dr33mphaz3r.net/static-assets/enter-button.gif";
const enterButtonHover = "https://str33m.dr33mphaz3r.net/static-assets/enter-button-hover.gif";

const logoutButton = "https://str33m.dr33mphaz3r.net/static-assets/logout-button.png";
const logoutButtonWebp = "https://str33m.dr33mphaz3r.net/static-assets/logout-button.webp";

const logoutButtonHover = "https://str33m.dr33mphaz3r.net/static-assets/logout-button-hover.png";
const logoutButtonHoverWebp = "https://str33m.dr33mphaz3r.net/static-assets/logout-button-hover.webp";

addLocaleData([...en]);

const showLogin = qsTruthy("login");


const SvgHoverButton =  ({ normalProps, hoverProps, style, ...otherProps }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <image
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={{
        ...style,
        cursor: "pointer"
      }}
      {...isShown ? hoverProps : normalProps}
      {...otherProps}
      />
  )
    };

const MenuComponent = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100vw" height="100vh" viewBox="0 0 3372 3371">
   <image id="BACKPLATE" x="62" y="-149" width="4064" height="3251" xlinkHref={mainMenuBack} />
   <SvgHoverButton id="About_Button" normalProps={{ x: "2466", y: "1353", width:"472", height:"781", xlinkHref: aboutNormal}} hoverProps={{ x: "2466", y:"1353", width:"472", height:"781", xlinkHref: aboutHover}} />
   <SvgHoverButton id="Credits_Button" hoverProps={{ x: "445", y: "1337", width: "465", height: "768", xlinkHref: creditHover}} normalProps={{ x: "445", y: "1337", width: "465", height: "768", xlinkHref: creditNormal }} />
   <SvgHoverButton id="LogIn_Button" hoverProps={{ x: "1528", y: "2273", width: "301", height: "76", xlinkHref: loginHover }}  normalProps={{ x: "1520", y: "2265", width: "317", height: "93", xlinkHref: loginNormal }} />
   <SvgHoverButton id="BC_Button" normalProps={{ x: "2992", y: "2702", width: "170", height: "131", xlinkHref: bcNormal }} hoverProps={{ x: "2977", y: "2687", width: "200", height: "161", xlinkHref: bcHover }}/>
   <SvgHoverButton id="FB_Button" hoverProps={{ x: "2823", y: "2676", width: "183", height: "183", xlinkHref: fbHover }}  normalProps={{ x: "2839", y: "2692", width: "151", height: "151", xlinkHref: fbNormal }} />
   <SvgHoverButton id="SC_hover" hoverProps={{ x: "2627", y: "2688", width: "196", height: "161", xlinkHref: scHover }} normalProps={{ x: "2627", y: "2688", width: "196", height: "161", xlinkHref: scNormal }} />
 </svg>);
 
 }

const LogoutButton = ({ onLinkClicked }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={{
        border: "none",
        background: "none",
        padding: "0",
        margin: "0",
        cursor: "pointer"
      }}
      onClick={onLinkClicked}
    >
      {isShown ? (
        <picture>
          <source srcSet={logoutButtonHoverWebp} type="image/webp" />

          <img
            style={{
              maxWidth: "200px",
              marginRight: "-25px"
            }}
            src={logoutButtonHover}
          />
        </picture>
      ) : (
        <picture>
          <source srcSet={logoutButtonWebp} type="image/webp" />

          <img
            style={{
              maxWidth: "200px",
              marginRight: "-25px"
            }}
            src={logoutButton}
          />
        </picture>
      )}
    </button>
  );
};

const LoginButton = ({ onLinkClicked }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <a
      href="/signin"
      rel="noreferrer noopener"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={{
        border: "none",
        background: "none",
        padding: "0",
        margin: "0",
        cursor: "pointer"
      }}
    >
      {isShown ? (
        <picture>
          <source srcSet={loginButtonHoverWebp} type="image/webp" />

          <img
            style={{
              maxWidth: "200px"
            }}
            src={loginButtonHover}
          />
        </picture>
      ) : (
        <picture>
          <source srcSet={loginButtonWebp} type="image/webp" />

          <img
            style={{
              maxWidth: "200px"
            }}
            src={loginButton}
          />
        </picture>
      )}
    </a>
  );
};

const EnterButton = props => {
  const [isShown, setIsShown] = useState(false);

  // <a onClick={this.onLinkClicked(this.showSignInDialog)}></a>
  // <a onClick={this.onLinkClicked(this.signOut)}>

  return (
    <button
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      style={{
        border: "none",
        background: "none",
        padding: "0",
        margin: "0",
        cursor: "pointer"
      }}
      onClick={e => {
        e.preventDefault();
        const targetUrl = getRoomMetadata("lobby").url;
        if (targetUrl) {
          location.href = targetUrl;
        } else {
          console.error("invalid portal targetRoom:", this.data.targetRoom);
        }
      }}
    >
      <img
        style={{
          maxWidth: "120px",
          mixBlendMode: "lighten"
        }}
        src={isShown ? enterButtonHover : enterButton}
      />
    </button>
  );
};

export function HomePage() {
  const auth = useContext(AuthContext);

  /*
  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const featuredRooms = Array.from(new Set([...favoriteRooms, ...publicRooms])).sort(
    (a, b) => b.member_count - a.member_count
  );
  */

  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

  const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;

  // const pageStyle = { backgroundImage: configs.image("home_background", true) };

  const pageStyle = {
    display: "flex",
    alignItems: "center"
  };

  /*
  const logoUrl = configs.image("logo");
  const showDescription = featuredRooms.length === 0;
  const logoStyles = classNames(styles.logoContainer, {
    [styles.centerLogo]: !showDescription
  });
  */

  return (
    <Page className={styles.homePage} style={pageStyle}>
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          overflow: "hidden",
          zIndex: "-100"
        }}
      >
        <video playsInline loop autoPlay muted className="video-container">
          <source src={splashMp4} type="video/mp4" />
          <source src={splashWebm} type="video/webm" />
        </video>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1",
          zIndex: "1"
        }}
      >
        <audio loop autoPlay>
          <source src={backgroundAudio} type="audio/mpeg" />
        </audio>
        <div
          style={{
            position: "relative"
          }}
        >
          <MenuComponent/>
          {/* <picture>
            <source srcSet={logoImageWebp} type="image/webp" />
            <img
              src={logoImage}
              style={{
                width: "100%",
                maxWidth: "750px",
                animation: "logo-rotate 5s linear infinite",

                mixBlendMode: "normal"
              }}
            />
          </picture> */}
          {/* <div style={{
            position: "absolute",
            bottom: "-180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%"
          }}>
            {!auth.isSignedIn &&
              <picture>
                <source srcset={aug20ImageWebp} type="image/webp" />
                <source srcset={aug20Image} type="image/gif" />
                <img src={aug20ImageWebp} style={{
                  maxWidth: "200px",
                  mixBlendMode: "lighten",
                  clipPath: "inset(91px 17px 88px 27px)"
                }} />
              </picture>
            }
          </div> */}
        </div>
        {auth.isSignedIn && (
          <div
            style={{
              marginLeft: "225px", // half of maxWidth above
              mixBlendMode: "lighten"
            }}
          >
            <EnterButton />
          </div>
        )}
      </div>
      <div className={styles.ctaButtons}>
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "16px",
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column"
          }}
        >
          {!auth.isSignedIn && showLogin && <LoginButton onLinkClicked={auth.showSignInDialog} />}
          {auth.isSignedIn && <LogoutButton onLinkClicked={auth.signOut} />}
          {auth.isSignedIn && (
            <div
              style={{
                color: "#667000",
                textTransform: "lowercase",
                maxWidth: "240px",
                textAlign: "right",
                marginTop: "24px",
                marginRight: "20px"
              }}
            >
              <span>
                <FormattedMessage id="sign-in.as" /> {auth.email}
              </span>{" "}
            </div>
          )}
        </div>
      </div>
      {/* <SignInDialog
        authStarted={false}
        authComplete={false}
        onSignIn={null}
        onContinue={null}
        message={"Test"}
        continueText={"zz"}
        closable={false}
      /> */}
      {/* <section>
        <div className={styles.appInfo}>
          <div className={logoStyles}>
            <img src={logoUrl} />
          </div>
          {showDescription && (
            <div className={styles.appDescription}>
              <FormattedMessage id="app-description" />
            </div>
          )}
        </div>
        <div className={styles.ctaButtons}>
          {canCreateRooms && <CreateRoomButton />}
          <PWAButton />
        </div>
      </section>
      {featuredRooms.length > 0 && (
        <section className={styles.featuredRooms}>
          <MediaGrid>{featuredRooms.map(room => <RoomTile key={room.id} room={room} />)}</MediaGrid>
        </section>
      )}
      <section>
        <div className={styles.secondaryLinks}>
          <a href="/link">
            <FormattedMessage id="home.have_code" />
          </a>
          <div>
            <IfFeature name="show_discord_bot_link">
              <FormattedMessage id="home.add_to_discord_1" />
              <img src={discordLogoUrl} />
              <a href="/discord">
                <FormattedMessage id="home.add_to_discord_2" />
              </a>
              <FormattedMessage id="home.add_to_discord_3" />
            </IfFeature>
          </div>
        </div>
      </section> */}
    </Page>
  );
}
