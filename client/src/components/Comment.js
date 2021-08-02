import { useState } from 'react';
import { Button, Comment, Divider, Header, Form } from 'semantic-ui-react';

import { CommentFloatBtn } from './FloatBtn';

const styles = {
  textarea: {
    maxHeight: '5rem',
  },
};

export const FeedComment = ({ style }) => {
  const [seeComments, setSeeComments] = useState(false);
  const [commenting, setCommenting] = useState(false);
  return (
    <>
      <CommentFloatBtn
        name={'chevron circle down'}
        setSeeComments={setSeeComments}
      />
      <Comment.Group style={style}>
        {seeComments && (
          <Header as="h3" dividing>
            Comments
          </Header>
        )}
        <Divider />
        {seeComments && (
          <CommentFloatBtn name={'add circle'} setCommenting={setCommenting} />
        )}
        {commenting && (
          <Form reply>
            <Form.TextArea style={styles.textarea} />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        )}
      </Comment.Group>
    </>
  );
};
