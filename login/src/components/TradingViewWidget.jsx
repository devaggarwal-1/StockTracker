// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ stockSymbol }) {
    const container = useRef();

    useEffect(
        () => {

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${stockSymbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "hide_top_toolbar": false,
          "hide_legend": true,
          "save_image": false,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.innerHTML = ''
            container.current.appendChild(script);
        },
        [stockSymbol]
    );

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>

        </div>
    );
}

export default TradingViewWidget;
