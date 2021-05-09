import Page from "@govuk-react/page";
import { H1, H3 } from "@govuk-react/heading";
import TopNav, { asTopNavAnchor } from "@govuk-react/top-nav";
import CrownIcon from "@govuk-react/icon-crown";

import { QueryClient, QueryClientProvider } from "react-query";

import { FindTest } from "./FindTest";

const queryClient = new QueryClient();

const LogoAnchor = asTopNavAnchor("a");

const Company = (
  <LogoAnchor
    href={
      "https://www.gov.uk/guidance/how-to-quarantine-when-you-arrive-in-england"
    }
    target="new"
  >
    <TopNav.IconTitle
      icon={<CrownIcon width="36" height="32" />}
    ></TopNav.IconTitle>
  </LogoAnchor>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page
        header={
          <TopNav serviceTitle="Find a covid travel test" company={Company} />
        }
      >
        <H1>Find a covid travel test</H1>
        <H3>
          This is not an official GOV.UK service, but an open source service
          built on top of the list of providers from the{" "}
          <a
            target="new"
            href="https://www.gov.uk/guidance/providers-of-day-2-and-day-8-coronavirus-testing-for-international-arrivals"
          >
            official covid quarantine guidance
          </a>
          .
        </H3>
        <FindTest />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
