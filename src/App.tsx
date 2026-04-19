import {useForm} from "react-hook-form";
import Input from "./components/ui/Input.tsx";
import Button from "./components/ui/Button.tsx";
import Spinner from "./components/ui/Spinner.tsx";
import Select from "./components/ui/select/Select.tsx";
import MultiSelect from "./components/ui/select/MultiSelect.tsx";
import SearchableSelect from "./components/ui/select/SearchSelect.tsx";
import Carousel from "./components/ui/Carousel.tsx";
import {Accordion} from "./components/ui/Accordian.tsx";
import Badge from "./components/ui/Badge.tsx";
import Separator from "./components/ui/Seperator.tsx";
import {H1, H2, H3, H4} from "./components/ui/Typography.tsx";
import FlexGrid from "./components/ui/FlexGrid.tsx";
import Checkbox from "./components/ui/Checkbox/Checkbox.tsx";
import RadioButton from "./components/ui/RadioButton/RadioButton.tsx";
import TextArea from "./components/ui/TextArea.tsx";
import {useState} from "react";
import {Modal} from "./components/ui/Modal.tsx";
import EmptyState from "./components/ui/EmptyState.tsx";
import { BatteryMedium} from 'lucide-react';
import {Skeleton} from "./components/ui/SkeletonLoader.tsx";
import {Tooltip} from "./components/ui/Tooltip.tsx";
import {Popover} from "./components/ui/Popover.tsx";
import Avatar from "./components/ui/Avatar.tsx";

function App() {
const {control} = useForm()
    const [open, setOpen] = useState(false);

  const  images = [
      {src:"https://images.unsplash.com/photo-1761839256545-4268b03606c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8", alt:"odinson"},
      {src:"https://unsplash.com/photos/two-women-arriving-at-a-doorway-greeted-by-another-woman-MdcJY5doCTo", alt:"odinson1"}]

      const Accordianitem = [
            {title:"Oidnson", content:"odinson"},
            {title:"Oidnson", content:"odinson"},
      ]
  return (
      <>
          <Popover trigger={<Avatar size={"lg"} url={"https://images.unsplash.com/photo-1761839256545-4268b03606c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"} alt={"avatar"} fallback={"https://unsplash.com/photos/two-women-arriving-at-a-doorway-greeted-by-another-woman-MdcJY5doCTo"} />} placement="bottom" className={'ml-64'} contentClassName={"bg-green-500"}>
              <p className="font-semibold">User Settings</p>
              <p className="text-zinc-400 text-xs">Manage your account</p>
          </Popover>
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

        <Select name={"odinson"} control={control} options={[]} variant={"bordered"} label={"Normal Select bordered"} />
        <Select name={"odinson"} control={control} options={[]} variant={"flat"} label={"Normal Select flat"}/>
        <Select name={"odinson"} control={control} options={[]} variant={"underline"} label={"Normal Select underline"} />

        <MultiSelect name={"odinson"} control={control} options={[]} variant={"bordered"} placeholder={"Multi Select"} />
        <MultiSelect name={"odinson"} control={control} options={[]} variant={"flat"} placeholder={"Multi Select"}/>
        <MultiSelect name={"odinson"} control={control} options={[]} variant={"underline"} placeholder={"Multi Select"}/>

        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"bordered"} label={"Searchable Select"} />
        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"flat"} label={"Searchable Select"}/>
        <SearchableSelect name={"odinson"} control={control} options={[]} variant={"underline"} label={"Searchable Select"}/>

        <Carousel images={images} />
        <div></div>
        <div></div>


        <Accordion items={Accordianitem} variant={"bordered"} />
        <Accordion items={Accordianitem} variant={"flush"} />
        <Accordion items={Accordianitem} variant={"filled"} />

        <Accordion items={Accordianitem} variant={"card"} />
        <div></div>
        <div></div>
<div>

        <Badge type={"notification"} variant={"default"} showContent={false} ></Badge>
</div>
        <div>

        <Badge type={"notification"} variant={"secondary"} showContent={true} ></Badge>
        </div>
        <div>

        <Badge type={"notification"} variant={"success"} showContent={true} ></Badge>
        </div>
<div>

        <Badge type={"nonNotification"} variant={"info"} showContent={true}>Example </Badge>
</div>
        <div>

        <Badge type={"nonNotification"} variant={"outline"} showContent={true}>Example</Badge>
        </div>
        <div>
        <Badge type={"nonNotification"} variant={"danger"} showContent={true}>Example</Badge>
        </div>
<div>
        <Badge type={"nonNotification"} variant={"ghost"} showContent={true}>Example</Badge>
</div>
        <div>
        <Badge type={"nonNotification"} variant={"warning"} showContent={true}>Example</Badge>
        </div>
        <div></div>

        <Separator orientation={"horizontal"} className={"bg-red-700"} />
        <Separator orientation={"vertical"} className={"bg-red-700 h-16"} />
        <div></div>

        <H1>This is H1</H1>
        <H2>This is H2</H2>
        <H3>This is H3</H3>

        <H4>This is H4</H4>
        <div></div>
        <div></div>

        <div className={""}>

        </div>
        <Checkbox control={control} label={"odin"} name={"odinson"}/>
        <RadioButton control={control} label={"odin"} name={"odinson"} value={"male"}/>
        <TextArea name={"text"} control={control} label={"text"} />

        <div>

        <Button onClick={() => setOpen(true)} className={"bg-red-700"}>Open Modal</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <H1>This is the modal</H1>
            <Button onClick={() => setOpen(false)}>close</Button>
            <H1>This is the modal</H1>
        </Modal>
        </div>
    </div>
          <FlexGrid minWidth={500} className={"bg-amber-700 p-4"} gap={"2"} orientation={"horizontal"}>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
              <div className={"bg-red-500"}>This is two</div>
          </FlexGrid>
          <EmptyState title={"Nothing seems to be here, Comeback later"} icon={<BatteryMedium />} className={'bg-black text-white border '} />
          <div className={'flex'}>
              <Skeleton className="h-12 w-12 rounded-full bg-gray-500 ml-64" />
              <div className={'flex flex-col space-y-1 '}>
                  <Skeleton className="h-4 w-24  bg-gray-500 " />
                  <Skeleton className="h-4 w-24  bg-gray-500 " />
              </div>
          </div>
          <div className={"flex space-y-1 "}>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
              <Tooltip side={"top"} content={"Odinson Was here"}>Odinson</Tooltip>
          </div>
          <Avatar size={"lg"} url={"https://images.unsplash.com/photo-1761839256545-4268b03606c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"} alt={"avatar"} fallback={"https://unsplash.com/photos/two-women-arriving-at-a-doorway-greeted-by-another-woman-MdcJY5doCTo"} />
          </>
  )
}

export default App
