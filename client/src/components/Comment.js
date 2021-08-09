import { useState } from 'react';
import { Button, Comment, Divider, Header, Form } from 'semantic-ui-react';
import { useTrail, animated } from 'react-spring';

import { AddCommentBtn, SeeCommentsBtn } from './FloatBtn';

const styles = {
  textarea: {
    maxHeight: '5rem',
  },
};

const config = { mass: 5, tension: 1000, friction: 80 };

export const FeedComment = ({ style }) => {
  const [seeComments, setSeeComments] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const comments = ['Comment 1', 'Comment 2'];
  const commentTrail = useTrail(1, {
    config,
    opacity: seeComments ? 1 : 0,
    x: seeComments ? 20 : 0,
    height:
      seeComments && commenting
        ? 220 + 66 * comments.length
        : seeComments
        ? 80 + 66 * comments.length
        : 0,
    from: { opacity: 0, x: 0, height: 0 },
  });
  const addTrail = useTrail(1, {
    config,
    opacity: commenting ? 1 : 0,
    x: commenting ? 10 : 0,
    height: commenting ? 80 : 0,
    from: { opacity: 0, x: 0, height: 0 },
  });
  return (
    <>
      <SeeCommentsBtn
        setCommenting={setCommenting}
        setSeeComments={setSeeComments}
      />
      {commentTrail.map(({ x, height }) => (
        <animated.div
          className="trails-text"
          style={{
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            marginBottom: '0.5rem',
          }}
        >
          <animated.div style={{ height }}>
            <Comment.Group style={style}>
              {seeComments && (
                <>
                  <Header as="h3" dividing>
                    Comments
                  </Header>
                  {comments.map((comment) => (
                    <Comment>
                      <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                          <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </>
              )}
              {!seeComments && <Divider />}
              {seeComments && <AddCommentBtn setCommenting={setCommenting} />}
              {commenting &&
                addTrail.map(({ x, height }) => (
                  <animated.div
                    className="trails-text"
                    style={{
                      transform: x.interpolate(
                        (x) => `translate3d(0,${x}px,0)`
                      ),
                      marginBottom: '4em',
                    }}
                  >
                    {' '}
                    <animated.div style={{ height }}>
                      <Form reply>
                        <Form.TextArea style={styles.textarea} />
                        <Button
                          content="Add Comment"
                          labelPosition="left"
                          icon="edit"
                          primary
                        />
                      </Form>
                    </animated.div>
                  </animated.div>
                ))}
            </Comment.Group>
          </animated.div>
        </animated.div>
      ))}
    </>
  );
};
