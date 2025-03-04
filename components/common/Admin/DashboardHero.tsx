"useclient";
import React, { useState } from "react";

import DashboardHeader from "./DashboardHeader";

const DashboardHero = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardHero;
