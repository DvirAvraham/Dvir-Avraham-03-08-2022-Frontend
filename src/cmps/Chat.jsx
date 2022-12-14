import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMsg } from '../store/actions/userActions';
import { FiSend } from 'react-icons/fi';
import Time from 'react-time';

const Chat = ({ currChat, loggedInUserId, isDark }) => {
  const elScroll = useRef(null);
  const dispatch = useDispatch();
  const [txt, setTxt] = useState('');

  const handleAddMsg = () => {
    dispatch(addMsg(txt));
    setTxt('');
    pageScroll();
  };

  useLayoutEffect(() => {
    if (elScroll?.current) pageScroll();
  }, [currChat]);

  const pageScroll = () => {
    if (elScroll?.current) elScroll.current.scrollBy(0, 2000);
  };

  return (
    <div className="chat flex column">
      <div className="msgs flex column grow-1" ref={elScroll}>
        {!!currChat?.msgs?.length &&
          currChat.msgs.map((msg, idx) => {
            return (
              <div
                className={`flex justify-between msg ${
                  msg.createdBy === loggedInUserId ? 'my' : ''
                } ${isDark ? 'dark' : ''} `}
                key={idx}
              >
                <div> {msg.txt} </div>
                <Time className="time" value={msg.createdAt} format="HH:mm" />
              </div>
            );
          })}
      </div>
      <div className="actions flex">
        <input
          className={`${isDark ? 'dark' : ''}`}
          type="text"
          placeholder="Message..."
          value={txt}
          onChange={(ev) => setTxt(ev.target.value)}
        />
        <button
          disabled={!txt}
          className="send flex justify-center align-center"
          onClick={handleAddMsg}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
