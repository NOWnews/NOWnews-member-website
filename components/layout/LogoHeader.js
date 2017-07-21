import { Header, Image } from 'semantic-ui-react';

export default () => (
  <Header as='h1' textAlign='center'>
    <style>{`
        .logo-header {
          padding-top: 50px;
        }
    `}</style>
    <Header.Content className='logo-header'>
      NOWnews 會員系統
    </Header.Content>
    <Image.Group size='tiny'>
      <Image src='/static/logo/NOWnews.jpg' />
      <Image src='/static/logo/watchNOW.png' />
      <Image src='/static/logo/NOWlink.jpg' />
    </Image.Group>
  </Header>
);
