import React from "react";
import SquealRankByReaction from "./SquealRankByReaction";
import SquealRankByReactionInverse from "./SquealRankByReactionInverse";
import SquealRankByComments from "./SquealRankByComments";
import SquealRankByCommentsInverse from "./SquealRankByCommentsInverse";
import SquealRankByViews from "./SquealRankByViews";
import SquealRankByViewsInverse from "./SquealRankByViewsInverse";
import SquealRankByPositive from "./SquealRankByPositive";
import SquealRankByNegative from "./SquealRankByNegative";
import SquealRankByPosNegRateo from "./SquealRankByPosNegRateo";
import SquealRankByPosNegRateoInverse from "./SqeualRankByPosNegRateoInverse";
import ChartSquealTime from "./ChartSquealTime";

const StatsTabs = () => {
  const [tab, setTab] = React.useState(1);

  const toggleTab = (index: number) => {
    setTab(index);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="mb-8 mt-8 w-2/3 border-b border-gray-200 dark:border-gray-700 flex justify-center items-center">
          <ul
            className="flex flex-wrap -mb-px text-[20px] font-medium text-center justify-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 1
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="profile-tab"
                data-tabs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => toggleTab(1)}
              >
                Num Reazioni
              </button>
            </li>
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 2
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="dashboard-tab"
                data-tabs-target="#dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
                onClick={() => toggleTab(2)}
              >
                Commenti
              </button>
            </li>
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 3
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="settings-tab"
                data-tabs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
                onClick={() => toggleTab(3)}
              >
                Views
              </button>
            </li>
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 4
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="contacts-tab"
                data-tabs-target="#contacts"
                type="button"
                role="tab"
                aria-controls="contacts"
                aria-selected="false"
                onClick={() => toggleTab(4)}
              >
                Like / Dislike
              </button>
            </li>
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 5
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="contacts-tab"
                data-tabs-target="#contacts"
                type="button"
                role="tab"
                aria-controls="contacts"
                aria-selected="false"
                onClick={() => toggleTab(5)}
              >
                Like / Dislike Rateo
              </button>
            </li>
            <li className="me-4" role="presentation">
              <button
                className={
                  tab == 6
                    ? "inline-block p-4 border-b-2 border-[#4B2CA0] rounded-t-lg"
                    : "inline-block p-4 border-b-2 border-[#F4F4F4] hover:border-[#4B2CA0] rounded-t-lg"
                }
                id="contacts-tab"
                data-tabs-target="#contacts"
                type="button"
                role="tab"
                aria-controls="contacts"
                aria-selected="false"
                onClick={() => toggleTab(6)}
              >
                Squeal / Giorni
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {tab == 1 && (
          <div className="flex gap-16 justify-center">
            <SquealRankByReaction />
            <SquealRankByReactionInverse />
          </div>
        )}
        {tab == 2 && (
          <div className="flex gap-16 justify-center">
            <SquealRankByComments />
            <SquealRankByCommentsInverse />
          </div>
        )}
        {tab == 3 && (
          <div className="flex gap-16 justify-center">
            <SquealRankByViews />
            <SquealRankByViewsInverse />
          </div>
        )}
        {tab == 4 && (
          <div className="flex gap-16 justify-center">
            <SquealRankByPositive />
            <SquealRankByNegative />
          </div>
        )}
        {tab == 5 && (
          <div className="flex gap-16 justify-center">
            <SquealRankByPosNegRateo />
            <SquealRankByPosNegRateoInverse />
          </div>
        )}
        {tab == 6 && <ChartSquealTime />}
      </div>
    </>
  );
};

export default StatsTabs;
