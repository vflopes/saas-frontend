import React from "react";

import { Link } from "@tanstack/react-router";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

import { ChevronRightIcon } from "lucide-react";

const SignUpCallToAction: React.FC = () => {
  return (
    <Item variant="outline" size="sm" asChild>
      <Link to="/sign-up" search={(prev) => ({ redirect: prev.redirect })}>
        <ItemContent>
          <ItemTitle>
            New here? <b>Create your account.</b>
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Link>
    </Item>
  );
};

export default SignUpCallToAction;
