import React from "react";
import {Meta} from "@storybook/react";

import {Link, Text, Button, Spacer, Dropdown, Avatar, Input} from "../index";
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale, Search} from "../utils/icons";
import {styled} from "../theme/stitches.config";

import Navbar from "./index";

export default {
  title: "Navigation/Navbar",
  component: Navbar,
} as Meta;

const AcmeLogo = () => (
  <svg
    className=""
    fill="none"
    height="36"
    viewBox="0 0 32 32"
    width="36"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="var(--secondary)" height="100%" rx="16" width="100%" />
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const Box = styled("div", {
  // Reset
  boxSizing: "border-box",
});

const DefaultPageContent = () => (
  <Box
    css={{
      px: "$12",
      mt: "$8",
      height: "600px",
      position: "relative",
      "@xsMax": {
        px: "$10",
      },
    }}
  >
    <Text h2>Lorem ipsum dolor sit ame</Text>
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text size="$xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Purus gravida quis blandit turpis. Augue neque gravida in
      fermentum et sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
      egestas sed sed risus pretium quam vulputate. Interdum velit euismod in pellentesque massa
      placerat duis ultricies.
    </Text>
  </Box>
);

const DefaultNavbarContent = ({color}: {color?: any}) => (
  <>
    <Navbar.Brand>
      <AcmeLogo />
      <Text b color="inherit" css={{"@xsMax": {d: "none"}}}>
        ACME
      </Text>
    </Navbar.Brand>
    <Navbar.Content
      enableCursorHighlight
      isCursorHighlightRounded
      activeColor={color}
      hideIn="sm"
      variant="highlight"
    >
      <Navbar.Link href="#">Features</Navbar.Link>
      <Navbar.Link isActive href="#">
        Customers
      </Navbar.Link>
      <Navbar.Link href="#">Integrations</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Company</Navbar.Link>
    </Navbar.Content>
    <Navbar.Content>
      <Navbar.Link color="inherit" href="#">
        Login
      </Navbar.Link>
      <Navbar.Item>
        <Button auto flat as={Link} color={color} href="#">
          Sign Up
        </Button>
      </Navbar.Item>
    </Navbar.Content>
  </>
);

const App = React.forwardRef(({children}: any, ref: any) => {
  return (
    <Box
      ref={ref}
      css={{
        maxW: "920px",
        maxHeight: "600px",
        overflow: "hidden scroll",
        boxShadow: "$md",
        position: "relative",
        border: "1px solid $colors$border",
      }}
    >
      {children}
      <DefaultPageContent />
    </Box>
  );
});

App.displayName = "App";

export const Static = () => (
  <App>
    <Navbar>
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const Sticky = () => (
  <App>
    <Navbar isBordered isCompact variant="sticky">
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const Floating = () => (
  <App>
    <Navbar color="contrast" variant="floating">
      <DefaultNavbarContent />
    </Navbar>
  </App>
);

export const HideOnScroll = () => {
  const parentRef = React.useRef(null);

  return (
    <App ref={parentRef}>
      <Navbar isBordered shouldHideOnScroll parentRef={parentRef} variant="floating">
        <DefaultNavbarContent />
      </Navbar>
    </App>
  );
};

export const WithToggle = () => {
  const parentRef = React.useRef(null);
  const collapseItems = [
    "Store",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "TV & Home",
    "Music",
    "Support",
    "Store2",
    "Mac2",
    "iPad2",
    "iPhone2",
    "Watch2",
    "TV & Home2",
    "Music2",
    "Support2",
  ];

  return (
    <App ref={parentRef}>
      <Navbar isBordered parentRef={parentRef} variant="sticky">
        <Navbar.Content>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Navbar.Brand>
            <AcmeLogo />
            <Text b color="inherit" css={{"@xsMax": {d: "none"}}}>
              ACME
            </Text>
          </Navbar.Brand>
        </Navbar.Content>
        <Navbar.Content
          enableCursorHighlight
          isCursorHighlightRounded
          hideIn="sm"
          variant="underline"
        >
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Integrations</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={`${item}-${index}`} css={{fontSize: "$lg"}}>
              {item}
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </App>
  );
};

export const WithDropdown = () => {
  const parentRef = React.useRef(null);
  const collapseItems = [
    "Store",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "TV & Home",
    "Music",
    "Support",
    "Store",
    "Mac",
    "iPad",
    "iPhone",
    "Watch",
    "TV & Home",
    "Music",
    "Support",
  ];

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale fill="var(--nextui-colors-warning)" size={30} />,
    lock: <Lock fill="var(--nextui-colors-success)" size={30} />,
    activity: <Activity fill="var(--nextui-colors-secondary)" size={30} />,
    flash: <Flash fill="var(--nextui-colors-primary)" size={30} />,
    server: <Server fill="var(--nextui-colors-success)" size={30} />,
    user: <TagUser fill="var(--nextui-colors-error)" size={30} />,
  };

  return (
    <App ref={parentRef}>
      <Navbar isBordered parentRef={parentRef} variant="sticky">
        <Navbar.Content>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Navbar.Brand>
            <AcmeLogo />
            <Text b color="inherit" css={{"@xsMax": {d: "none"}}}>
              ACME
            </Text>
          </Navbar.Brand>
        </Navbar.Content>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="sm"
          variant="underline"
        >
          <Dropdown isBordered>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: {pe: "none"},
                }}
                iconRight={icons.chevron}
                ripple={false}
              >
                Features
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                showFullDescription
                description="ACME scales apps to meet user demand, automagically, based on load."
                icon={icons.scale}
              >
                Autoscaling
              </Dropdown.Item>
              <Dropdown.Item
                key="safe_and_sound"
                showFullDescription
                description="A secure mission control, without the policy headache. Permissions, 2FA, and more."
                icon={icons.lock}
              >
                Safe and Sound
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                showFullDescription
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                icon={icons.activity}
              >
                Usage Metrics
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                showFullDescription
                description="ACME runs on ACME, join us and others serving requests at web scale."
                icon={icons.flash}
              >
                Production Ready
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                showFullDescription
                description="Applications stay on the grid with high availability and high uptime guarantees."
                icon={icons.server}
              >
                +99% Uptime
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                showFullDescription
                description="Overcome any challenge with a supporting team ready to respond."
                icon={icons.user}
              >
                +Supreme Support
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Integrations</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} color="secondary" href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={`${item}-${index}`}>{item}</Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </App>
  );
};

export const WithAvatarUser = () => {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Logout",
  ];

  return (
    <App>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={`${item}-${index}`} isActive={index === 2}>
              <Link color="inherit" href="#">
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link isActive href="#">
            Dashboard
          </Navbar.Link>
          <Navbar.Link href="#">Team</Navbar.Link>
          <Navbar.Link href="#">Deployments</Navbar.Link>
          <Navbar.Link href="#">Activity</Navbar.Link>
          <Navbar.Link href="#">Settings</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({actionKey})}
            >
              <Dropdown.Item key="profile" css={{height: "$18"}}>
                <Text b color="inherit" css={{d: "flex"}}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{d: "flex"}}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </App>
  );
};

export const WithSearchInput = () => {
  return (
    <App>
      <Navbar isBordered variant="sticky">
        <Navbar.Content hideIn="xs" variant="highlight">
          <Navbar.Brand css={{mr: "$11"}}>
            <AcmeLogo />
            <Text b color="inherit">
              ACME
            </Text>
          </Navbar.Brand>
          <Navbar.Link isActive href="#">
            Dashboard
          </Navbar.Link>
          <Navbar.Link href="#">Team</Navbar.Link>
          <Navbar.Link href="#">Deployments</Navbar.Link>
          <Navbar.Link href="#">Activity</Navbar.Link>
          <Navbar.Link href="#">Settings</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content gap="$6">
          <Navbar.Item>
            <Input
              clearable
              contentLeft={<Search fill="var(--nextui-colors-accents6)" size={16} />}
              contentLeftStyling={false}
              css={{
                w: "210px",
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({actionKey})}
            >
              <Dropdown.Item key="profile" css={{height: "$18"}}>
                <Text b color="inherit" css={{d: "flex"}}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{d: "flex"}}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </App>
  );
};
