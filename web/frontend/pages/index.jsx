import {
  Page,
  LegacyStack,
  Layout,
  Badge,
  Text,
  LegacyCard,
  Popover,
  ActionList,
  Button,
  Select,
  ButtonGroup
} from "@shopify/polaris";

import {useState, useCallback} from 'react';

import CustomSidebar from './../components/CustomSidebar';

export default function HomePage() {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  // const [popoverActive, setPopoverActive] = useState(true);

  // const togglePopoverActive = useCallback(() => setPopoverActive(popoverActive => !popoverActive), []);

  // const activator = (
  //   <Button onClick={togglePopoverActive}>More actions</Button>
  // )

  // const [active, setActive] = useState(true);

  // const toggleActive = useCallback(() => setActive((active) => !active), []);

  // const handleImportedAction = useCallback(
  //   () => console.log('Imported action'),
  //   [],
  // );

  // const handleImportedAction = () => {
  //   setActive(active => !active);
  //   console.log('Handle imported action!');
  // };

  // const handleExportedAction = useCallback(() => console.log('Exported action'),
  //   [],
  // );

  // const activator = (
  //   <Button onClick={toggleActive} disclosure>
  //     More actions
  //   </Button>
  // );

  return (
    <Page fullWidth>
      {/* <LegacyStack alignment="center">
        <LegacyStack.Item>
          <Text variant="headingMd" as="h2">
            Order #1136
          </Text>
        </LegacyStack.Item>

        <LegacyStack.Item fill>
          <Badge>Paid</Badge>
        </LegacyStack.Item>

         <LegacyStack.Item>
          <Badge>Processing</Badge>
        </LegacyStack.Item>

        <LegacyStack.Item>
          <Badge>Fulfilled</Badge>
        </LegacyStack.Item>

        <LegacyStack.Item>
          <Badge>Completed</Badge>
        </LegacyStack.Item>

      </LegacyStack> */}

      <LegacyStack>
        <LegacyStack.Item>
          <CustomSidebar />
        </LegacyStack.Item>

        {/* <LegacyStack.Item fill>
          <Layout>
            <Layout.Section>
              <LegacyCard title="Online store dashboard" sectioned>
                <p>View a summary of your online store’s performance.</p>
                <p>Lorm </p>
              </LegacyCard>
            </Layout.Section>
            <Layout.Section>

        </Layout.Section>
          </Layout>
        </LegacyStack.Item> */}

        <LegacyStack.Item>
          {/* <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <ActionList
              actionRole="menuitem"
              items={[{ content: 'Import' }, { content: 'Export' }]}
              togglePopoverActive={togglePopoverActive}
            />
          </Popover> */}
          {/* <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: 'Import file',
              onAction: handleImportedAction,
            },
            {
              content: 'Export file',
              onAction: handleExportedAction,
            },
          ]}
        />
      </Popover> */}

          {/* <Select
            label="Date range"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          /> */}
        </LegacyStack.Item>

        <LegacyStack.Item>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button primary>Save</Button>
         </ButtonGroup>
        </LegacyStack.Item>

      </LegacyStack>

    </Page>
  );
}
