export const template = (moduleName: string) => {
    return `defmodule ${capitalize(moduleName)}Test do
    use ExUnit.Case
  
    test "one is one" do
      assert 1 == 1
    end
  end
  `;
};

const capitalize = (s: string) => `${s.substring(0,1).toLocaleUpperCase()}${s.substring(1,s.length)}`;