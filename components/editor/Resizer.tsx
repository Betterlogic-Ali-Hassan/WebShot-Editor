import React from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const Resizer = () => {
  return (
    <div>
      <div>
        <h4>Width</h4>
        <Input /> px
      </div>
      <div>
        <h4>Height</h4>
        <Input /> px
      </div>
      <div>
        <Checkbox />
        <label>Proportional</label>
      </div>
      <Button>Change</Button>
    </div>
  );
};

export default Resizer;
