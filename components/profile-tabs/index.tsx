import { useState } from "react";

const ProfileTabs = ({ tabs, setSelectedTab }: any) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="profile-tabs">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`profile-tabs__menu-btn ${
          filtersOpen ? "profile-tabs__menu-btn--active" : ""
        }`}
      >
        select tab <i className="icon-down-open"></i>
      </button>

      <div
        className={`profile-tabs__wrapper ${
          filtersOpen ? "profile-tabs__wrapper--open" : ""
        }`}
      >
        <div className="profile-tabs__block">
          <button type="button">Profile Sections</button>
          <div className="profile-tabs__block__content">
            {tabs.map((tab: string) => (
              <div onClick={() => setSelectedTab(tab)} className="tab">
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
