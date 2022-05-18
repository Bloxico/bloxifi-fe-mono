import { Text, CoverLayout, StackLayout } from '@bloxifi/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <CoverLayout>
        <Text type="heading 1" semiBold align="center">
          {t('filecoin.home.sysTestMatrix')}
        </Text>
        <StackLayout
          gap={4}
          center
          style={{ maxWidth: '700px' }}
          data-testId="text-body"
        >
          <Text type="text xl" color="textGray" semiBold align="center">
            {t('filecoin.home.subHeading')}
          </Text>

          <Text type="text xl" semiBold align="center">
            <i>{t('filecoin.home.paragraph1')}</i>
          </Text>
          <Text type="text xl" semiBold align="center">
            <i>{t('filecoin.home.paragraph2')}</i>
          </Text>
        </StackLayout>
        <Footer>
          <Text type="text xl" semiBold align="center">
            {t('filecoin.home.developedBy')}{' '}
          </Text>
        </Footer>
      </CoverLayout>
    </Wrapper>
  )
}
export default HomePage

const Wrapper = styled.body`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Footer = styled.div`
  margin-top: auto;
  margin-bottom: 1rem;
`
