import Layout from '../components/layout/Layout';
import LogoHeader from '../components/layout/LogoHeader';
import {
  Button, Form, Segment
} from 'semantic-ui-react';

export default () => (
  <Layout>
    <LogoHeader />
    <Segment>
      <Form>
        <Form.Field>
          <Button.Group widths={3}>
            <Button type='button' positive fluid>Phone</Button>
            <Button.Or />
            <Button type='button' fluid>Email</Button>
          </Button.Group>
        </Form.Field>

        {/* account is phone */}
        <Form.Group>
          <Form.Field width={4}>
            <input required placeholder='國碼' name='code' />
          </Form.Field>
          <Form.Field width={12}>
            <input required placeholder='手機' name='phone' />
          </Form.Field>
        </Form.Group>

        {/* account is email */}
        <Form.Field>
          <input required placeholder='信箱' name='email' />
        </Form.Field>

        <Form.Group>
          <Form.Field width={6}>
            <input required placeholder='驗證碼' name='code' />
          </Form.Field>
          <Form.Field width={3}>
            <Button type='button' loading>取得驗證碼</Button>
            還有 3 秒 ...
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <input required placeholder='密碼' name='password' type='password'/>
          </Form.Field>
          <Form.Field>
            <input required placeholder='確認密碼' name='confirmPassword' type='password'/>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <input required placeholder='暱稱（可中文、英文、數字）' name='nickname' />
        </Form.Field>
        <Form.Field>
          <label>登入即代表同意<a href='https://wwww.nownews.com/info/terms'>使用者條款</a></label>
        </Form.Field>
        <Button type='submit' fluid primary>Submit</Button>
      </Form>
    </Segment>
  </Layout>
);
