import React from "react";
import * as ReactDOM from "react-dom";

import { ModaqControl } from "../components/ModaqControl";

// This will be filled in by vite. This won't be used by people using the library
declare const __BUILD_VERSION__: string;

// If you want a different Google Sheets ID, replace this with your own
const demoGoogleClientId = "1038902414768-nj056sbrbe0oshavft2uq9et6tvbu2d5.apps.googleusercontent.com";
const demoYappService = "https://www.quizbowlreader.com/yapp/api/parse?modaq=true";

window.onload = () => {
    // This element might not exist when running tests. In that case, skip rendering the application.
    const element: HTMLElement | null = document.getElementById("root");
    if (element) {
        ReactDOM.render(
            <ModaqControl
                applyStylingToRoot={true}
                buildVersion={__BUILD_VERSION__}
                googleClientId={demoGoogleClientId}
                yappServiceUrl={demoYappService}
				customExport={{
					label: "Export!",
					type: "QBJ",
					customExportInterval: 10000,
					onExport: (qbj: any, curCycle: number, source: any) => {
						qbj.tossups_read = curCycle + 1;
						if (source['source'] == "Timer")
							qbj.isFinished = false;
						else if (source['source'] == "NextButton")
							qbj.isFinished = true;
						else if (source['source'] == "Menu")
							qbj.isFinished = true;
						else if (source['source'] == "NewGame")
							qbj.isFinished = true;
						console.log(qbj);
						console.log(fetch("https://draco.hdwhite.org/qb/pacensc2023/readgame.php",
						{
							method: 'POST',
							body: JSON.stringify(qbj),
							headers: { "Content-Type": "application/json" },
						}));
						return Promise.resolve({ isError: false, status: ""});
					}
				}}
            />,
            document.getElementById("root")
        );
    }
};
