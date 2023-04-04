import test from "ava";

import { wrapTextInFragment } from "../src/wrap-in-fragment";

test("wrapTextInFragment with default fragment", (t) => {
  t.is(wrapTextInFragment("'Hello'"), "<>Hello</>");
  t.is(wrapTextInFragment('"Hello"'), "<>Hello</>");
  t.is(wrapTextInFragment("`Hello`"), "<>{`Hello`}</>");
  t.is(wrapTextInFragment("1"), "<>{1}</>");
  t.is(wrapTextInFragment("[]"), "<>{[]}</>");
  t.is(wrapTextInFragment("{}"), "<>{{}}</>");
  t.is(wrapTextInFragment("<div>Hello</div>"), "<><div>Hello</div></>");
});

test("wrapTextInFragment with React.Fragment", (t) => {
  t.is(
    wrapTextInFragment("'Hello'", "React.Fragment"),
    "<React.Fragment>Hello</React.Fragment>"
  );
  t.is(
    wrapTextInFragment('"Hello"', "React.Fragment"),
    "<React.Fragment>Hello</React.Fragment>"
  );
  t.is(
    wrapTextInFragment("`Hello`", "React.Fragment"),
    "<React.Fragment>{`Hello`}</React.Fragment>"
  );
  t.is(
    wrapTextInFragment("1", "React.Fragment"),
    "<React.Fragment>{1}</React.Fragment>"
  );
  t.is(
    wrapTextInFragment("[]", "React.Fragment"),
    "<React.Fragment>{[]}</React.Fragment>"
  );
  t.is(
    wrapTextInFragment("{}", "React.Fragment"),
    "<React.Fragment>{{}}</React.Fragment>"
  );
  t.is(
    wrapTextInFragment("<div>Hello</div>", "React.Fragment"),
    "<React.Fragment><div>Hello</div></React.Fragment>"
  );
});
