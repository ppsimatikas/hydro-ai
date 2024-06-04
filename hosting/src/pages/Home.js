import React, { useState } from 'react';
import './Home.scss';
import ChatInput from '../components/chatinput.js';
import SlowText from '../components/slowtext.js';
import LoadingDots from '../components/loadingDots.js';
import Markdown from 'react-markdown'
import { Table } from "antd"
import ReactJson from 'react-json-view'

function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textLoaded, setTextLoaded] = useState(true);

  const postMessage = async (message) => {
      setMessages(prevMessages => [...prevMessages, {message, ai: false}]);
      setLoading(true);
      try {
          const response = await fetch('https://query-bqviz2vtka-ew.a.run.app', {
//          const response = await fetch('http://127.0.0.1:5000/query', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message })
          });
          setLoading(false);
          if (!response.ok) {
              throw new Error('Failed to send message');
          }
          const resp = await response.json();
          setTextLoaded(false);
          setMessages(prevMessages => [...prevMessages, {
            message: resp.message,
            columns: resp.columns,
            data: resp.data,
            ai: true
          }]);
      } catch (error) {
          console.error('Error:', error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, {
            message: "An error occurred. Please try again later.",
            ai: true
          }]);
      }
  };

  const renderWelcome = () => (
      <div className="welcome">
          <h1>Ask Hydro any<span>Sui</span>ng</h1>
          <img src='logo_big.png' className="App-logo" alt="logo" />
          <div>
          <p>the first <span>AI-trained</span> water creature that swims in the data network of SUI <img className="sui-logo" src="sui.png" alt="SUI"/></p>
          </div>
      </div>
  );

  const renderMessages = () => {
    return (
      <div className="messages">
        {
            loading &&
            <div className="message">
                <img className="micon" src="logo_big.png"/>
                <LoadingDots/>
            </div>
        }
        {
            [...messages].reverse().map(renderMessage)
        }
      </div>
    );
  };

  const renderCell = (text, record, index) => {
    if (checkJson(text)) {
        const jobj = JSON.parse(text);
        return (
            <>
                <ReactJson
                    src={jobj}
                    indentWidth={2}
                    collapsed
                    name={false}
                    displayObjectSize={false}
                    enableClipboard={false}
                    validationMessage={text}
                    style={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap'
                    }}
                />
                {
                    jobj.image_url &&
                    <img src={jobj.image_url} style={{
                      width: "200px",
                  }}/>
                }
            </>
        );
    }

    return (
        <>
            {text}
        </>
    );
  };

  const checkJson = (text) => {
    try {
        const result = JSON.parse(text);
        return result !== null && (typeof result === 'object' || Array.isArray(result));
    } catch (error) {
        return false;
    }
  };

  const renderMessage = (m, i) => {
    const hasData = m.data && m.data.length > 0;
    const columns = m.columns && m.columns.map((title) => {
        const isJson = hasData && checkJson(m.data[0][title]);
        return {
           title,
           dataIndex: title,
           key: title,
           defaultSortOrder: 'descend',
           sorter: (a, b) => a[title] - b[title],
           ellipsis: !isJson,
           render: renderCell,
           width: isJson ? 300 : null
       };
    });

    return (
      <div key={i} className="message-container">
          <div className="message">
              <img className="micon" src={m.ai ? "logo_big.png" : "person_placeholder.png"}/>
              {
                  i === 0 && m.ai ?
                  <SlowText text={m.message} textLoaded={() => setTextLoaded(true)}/> :
                  <p className="mp"><Markdown>{m.message}</Markdown></p>
              }
          </div>
          {
            hasData && (textLoaded || i !== 0) &&
            <div className="message">
                <img className="micon" src="no_pic.png"/>
                <Table
                    dataSource={m.data}
                    columns={columns}
                    size="middle"
                    bordered
                />
            </div>
          }
      </div>
    );
  };

  return (
    <div className="home">
        {!messages.length && renderWelcome()}
        {messages.length > 0 && renderMessages()}
        <ChatInput onAsk={postMessage} disabled={loading}/>
    </div>
  );
}

export default Home;
