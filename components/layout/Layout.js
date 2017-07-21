import Head from 'next/head';
import { Container } from 'semantic-ui-react';

export default ({ children, title = 'NOWnews會員系統' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' />
    </Head>
    <Container>
      { children }
    </Container>

    {/*<footer>
      <Container>
        今日傳媒(股)公司版權所有，非經授權，不許轉載本網站內容 © 2017 NOWnews.com. All Rights Reserved.
      </Container>
    </footer>*/}
  </div>
);
