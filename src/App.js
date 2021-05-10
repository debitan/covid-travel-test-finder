import Page from "@govuk-react/page";
import { H1, H2, H3, H4 } from "@govuk-react/heading";
import TopNav from "@govuk-react/top-nav";
import Footer from "@govuk-react/footer";

import { QueryClient, QueryClientProvider } from "react-query";

import { FindTest } from "./FindTest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page
        header={
          <TopNav
            bgColor="#4c2c92"
            serviceTitle="Find a covid travel test"
            company={null}
          />
        }
      >
        <H1>Find a covid travel test</H1>
        <H3 as={H2}>
          This is not an official GOV.UK service, but an{" "}
          <a
            target="new"
            href="https://github.com/debitan/covid-travel-test-finder"
          >
            open source
          </a>{" "}
          service built on top of the list of providers from the{" "}
          <a
            target="new"
            href="https://www.gov.uk/guidance/providers-of-day-2-and-day-8-coronavirus-testing-for-international-arrivals"
          >
            official covid quarantine guidance
          </a>
          .
        </H3>
        <H4 as={H3}>
          If this helps you at all, feel free to{" "}
          <a target="new" href="https://www.buymeacoffee.com/davematthews">
            buy me a beer
          </a>{" "}
          🍺
        </H4>
        <FindTest />
      </Page>
      <Footer
        copyright={null}
        meta={
          <Footer.MetaCustom>
            Built by{" "}
            <Footer.Link target="new" href="https://github.com/debitan">
              David Matthews
            </Footer.Link>
          </Footer.MetaCustom>
        }
      />
    </QueryClientProvider>
  );
}

export default App;
