import {useForm} from "react-hook-form";
import Input from "./components/ui/Input.tsx";
import Button from "./components/ui/Button.tsx";
import Spinner from "./components/ui/Spinner.tsx";
import Select from "./components/ui/select/Select.tsx";
import MultiSelect from "./components/ui/select/MultiSelect.tsx";
import SearchableSelect from "./components/ui/select/SearchSelect.tsx";
import Carousel from "./components/ui/Carousel.tsx";
import {Accordion} from "./components/ui/Accordian.tsx";


function App() {
const {control} = useForm()

  const  images = [
      {src:"https://images.unsplash.com/photo-1761839256545-4268b03606c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8", alt:"odinson"},
      {src:"https://unsplash.com/photos/two-women-arriving-at-a-doorway-greeted-by-another-woman-MdcJY5doCTo", alt:"odinson1"}]

      const Accordianitem = [
            {title:"Oidnson", content:"odinson"},
            {title:"Oidnson", content:"odinson"},
      ]
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 ml-4"}>
        <Input name={"name"} control={control} label={"odinson"} variant={"bordered"} />
        <Input name={"name"} control={control} label={"readOnly"} variant={"bordered"} isReadOnly={true} />
        <Input name={"name"} control={control} label={"odinson"} variant={"bordered"}  numberOnly={true} maxLength={10} />
        <Input name={"name"} control={control} label={"odinson"} variant={"bordered"} type={"password"} />
        <Input name={"name"} control={control} label={"odinson"} variant={"flat"} />
        <Input name={"name"} control={control} label={"odinson"} variant={"flat"}  type={"password"}/>
        <Input name={"name"} control={control} label={"odinson"} variant={"underline"}   />
        <Input name={"name"} control={control} label={"odinson"} variant={"underline"}  type={"password"} />
        <Button variant={"flat"}>odinson</Button>
        <Button variant={"solid"}>odinson</Button>
        <Button variant={"faded"}>odinson</Button>
        <Button variant={"bordered"}>odinson</Button>
        <Button variant={"ghost"}>odinson</Button>
        <Button variant={"danger"}>odinson</Button>
        <div></div>
        <Spinner size={"small"} />
        <Spinner size={"medium"} />
        <Spinner size={"large"} />
        <Spinner size={"small"} >Small</Spinner>
        <Spinner size={"medium"} >Medium</Spinner>
        <Spinner size={"large"} >Large</Spinner>
        <Select name={"odinson"} control={control} options={[]} variant={"bordered"} />
        <Select name={"odinson"} control={control} options={[]} variant={"flat"} />
        <Select name={"odinson"} control={control} options={[]} variant={"underline"} />
        <MultiSelect name={"odinson"} control={control} options={[]} variant={"bordered"} />
        <MultiSelect name={"odinson"} control={control} options={[]} variant={"flat"} />
        <MultiSelect name={"odinson"} control={control} options={[]} variant={"underline"} />
        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"bordered"} />
        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"flat"} />
        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"underline"} />
        <Carousel images={images} />
        <div></div>
        <div></div>


        <Accordion items={Accordianitem} variant={"bordered"} />
        <Accordion items={Accordianitem} variant={"flush"} />
        <Accordion items={Accordianitem} variant={"filled"} />
        <Accordion items={Accordianitem} variant={"card"} />


    </div>
  )
}

export default App
