const Tab = ({ tab, activeTab }) => {
  return <div className={`${activeTab ? "" : ""}`}>{tab}</div>;
};

const Tabs = ({ tabs, activeTab }) => {
  return (
    <div>
      {tabs.map((tab) => {
        return <Tab key={tab} tab={tab} activeTab={activeTab} />;
      })}
    </div>
  );
};

export default Tabs;
