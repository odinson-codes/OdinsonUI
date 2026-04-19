import { useState, createContext, useContext } from 'react';
import type{ ReactNode} from 'react';

// Type definitions
interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

interface TabsProps {
    children: ReactNode;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

// Context for managing tab state
const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Custom hook to use tabs context with type safety
function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs components must be used within a Tabs provider');
    }
    return context;
}

// Main Tabs wrapper component
export function Tabs({
                         children,
                         defaultValue = '',
                         value,
                         onChange,
                         className = ''
                     }: TabsProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultValue);

    const isControlled = value !== undefined;
    const currentTab = isControlled ? value : activeTab;

    const handleTabChange = (newValue: string) => {
        if (!isControlled) {
            setActiveTab(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab: handleTabChange }}>
            <div className={`w-full ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// TabsList - Container for tab triggers
export function TabsList({ children, className = '' }: TabsListProps) {
    return (
        <div className={`flex border-b border-gray-200 ${className}`} role="tablist">
            {children}
        </div>
    );
}

// TabsTrigger - Individual tab button
export function TabsTrigger({
                                value,
                                children,
                                className = '',
                                disabled = false
                            }: TabsTriggerProps) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
        <button
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}
            className={`
                px-4 py-2 font-medium text-sm transition-colors
                ${isActive
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
            }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

// TabsContent - Content for each tab
export function TabsContent({ value, children, className = '' }: TabsContentProps) {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) return null;

    return (
        <div role="tabpanel" className={`mt-4 ${className}`}>
            {children}
        </div>
    );
}