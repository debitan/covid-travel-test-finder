import Page from "@govuk-react/page";
import { H1, H3 } from "@govuk-react/heading";
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
          <TopNav serviceTitle="Find a covid travel test" company={null} />
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
