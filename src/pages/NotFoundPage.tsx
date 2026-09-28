import { PageContainer, Section } from '../components/layout/Primitives'
import { Button } from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'

export const NotFoundPage = () => {
  usePageTitle('Page not found')

  return (
    <main id="main-content">
      <Section padding="both" className="not-found">
        <PageContainer narrow>
          <p className="eyebrow">Not found</p>
          <h1 className="display-lg">This page isn't available.</h1>
          <p className="body-lg">The page you're looking for may have moved.</p>
          <Button to="/" variant="primary">Back to home</Button>
        </PageContainer>
      </Section>
    </main>
  )
}
