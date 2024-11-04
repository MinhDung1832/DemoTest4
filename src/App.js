import React from 'react';
import { AppProvider, Page, TextField, Button, Layout, Card, Text, BlockStack, Select, Box, Bleed } from '@shopify/polaris';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import logo from './logo.svg';
import './App.css';
import '@shopify/polaris/build/esm/styles.css';
import { DeleteIcon, PlusCircleIcon } from '@shopify/polaris-icons';
import { demoGet } from './services/service';

function App() {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      campaign: '',
      title: '',
      description: '',
      options: [
      { title: '', subtitle: '', label: '', quantity: '1', discountType: '', amount: '' },
      { title: '', subtitle: '', label: '', quantity: '2', discountType: '', amount: '' }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options'
  });

  const onSubmit = data => {
    console.log(data);
    // demo gọi api
    let id = 1;
    demoGet(id).then(response => {
      console.log(response);
    });
  };

  const discountTypeOptions = [
    { label: 'None', value: '' },
    { label: '% discount', value: '%' },
    { label: 'Discount / each', value: '$' }
  ];

  const watchFields = watch();

  return (
    <AppProvider>
      <Page backAction={{ content: 'Products', url: '#' }} title="Create volume discount">
        <Layout>
          <Layout.Section>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 2 }}>
                <Card title="General" sectioned>
                  <Box paddingBlockEnd={200}>
                    <Text as="h2" variant="headingMd">
                      General
                    </Text>
                  </Box>
                  <Box paddingBlockEnd={200}>
                    <Controller
                      name="campaign"
                      control={control}
                      rules={{ required: 'Campaign is required' }}
                      render={({ field }) => (
                        <TextField
                          label="Campaign"
                          {...field}
                          error={errors.campaign?.message}
                          autoComplete="campaign"
                        />
                      )}
                    />
                  </Box>
                  <Box paddingBlockEnd={200}>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: 'Title is required' }}
                      render={({ field }) => (
                        <TextField
                          label="Title"
                          {...field}
                          error={errors.title?.message}
                          autoComplete="title"
                        />
                      )}
                    />
                  </Box>
                  <Box paddingBlockEnd={200}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Description"
                          {...field}
                          error={errors.description?.message}
                          autoComplete="description"
                        />
                      )}
                    />
                  </Box>
                </Card>

                <div className='card-option'>
                  <Card>
                    <Box paddingBlockEnd={200}>
                      <Text as="h2" variant="headingMd">
                        Volume discount rule
                      </Text>
                    </Box>
                    <div className='block-option'>
                      {fields.map((field, index) => (
                        <Bleed marginInline="400" key={field.id} sectioned>
                          <Card>
                            <Bleed marginBlockStart={600} marginInlineStart={600}>
                              <div className='tag-option'>
                                <Box borderRadius='200' paddingBlockStart={300} paddingBlockEnd={200} width='100px' minHeight='30px'>
                                  <Text alignment='center' fontWeight='900'>Option {index + 1}</Text>
                                </Box>
                              </div>
                            </Bleed>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                              <Button plain destructive icon={DeleteIcon} onClick={() => remove(index)} />
                            </div>
                            <BlockStack>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '10px', rowGap: '10px' }}>
                                <Controller
                                  name={`options.${index}.title`}
                                  control={control}
                                  rules={{ required: 'Title is required' }}
                                  render={({ field }) => (
                                    <TextField
                                      label="Title"
                                      {...field}
                                      error={errors.options?.[index]?.title?.message}
                                      autoComplete="title"
                                    />
                                  )}
                                />
                                <Controller
                                  name={`options.${index}.subtitle`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      label="Subtitle"
                                      {...field}
                                      error={errors.options?.[index]?.subtitle?.message}
                                      autoComplete="subtitle"
                                    />
                                  )}
                                />
                                <Controller
                                  name={`options.${index}.label`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      label="Label (optional)"
                                      {...field}
                                      error={errors.options?.[index]?.label?.message}
                                      autoComplete="label"
                                    />
                                  )}
                                />
                                <Controller
                                  name={`options.${index}.quantity`}
                                  control={control}
                                  rules={{ required: 'Quantity is required' }}
                                  render={({ field }) => (
                                    <TextField
                                      type="number"
                                      label="Quantity"
                                      {...field}
                                      error={errors.options?.[index]?.quantity?.message}
                                      autoComplete="quantity"
                                    />
                                  )}
                                />

                                <Controller
                                  name={`options.${index}.discountType`}
                                  control={control}
                                  render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                      label="Discount type"
                                      options={discountTypeOptions}
                                      value={value}
                                      onChange={(selectedValue) => {
                                        onChange(selectedValue);
                                        if (selectedValue === '') {
                                          setValue(`options.${index}.amount`, '');
                                        }
                                      }}
                                      ref={ref}
                                    />
                                  )}
                                />
                                {watchFields.options[index]?.discountType && (
                                  <Controller
                                    name={`options.${index}.amount`}
                                    control={control}
                                    rules={{ required: 'Amount is required' }}
                                    render={({ field }) => (
                                      <TextField
                                        type="number"
                                        label="Amount"
                                        {...field}
                                        suffix={watchFields.options?.[index]?.discountType === '%' ? '%' : '$'}
                                        error={errors.options?.[index]?.amount?.message}
                                        autoComplete="amount"
                                      />
                                    )}
                                  />
                                )}
                              </div>
                            </BlockStack>
                          </Card>
                        </Bleed>
                      ))}
                    </div>
                    <Box paddingBlockStart={400} className="btn-add">
                      <Button
                        fullWidth
                        primary
                        icon={PlusCircleIcon}
                        onClick={() => {
                          const lastOption = fields[fields.length - 1]; // lấy option cuối
                          const nextQuantity = lastOption ? parseInt(lastOption.quantity) + 1 : 1; // cộng số lượng thêm 1
                          append({ title: '', subtitle: '', label: '', quantity: nextQuantity.toString(), discountType: '', amount: '' })
                        }
                        }
                      >
                        Add option
                      </Button>
                    </Box>
                  </Card>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Button submit primary>Submit</Button>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <Card title="Preview" sectioned>
                  <Box>
                    <Text as="h2" variant="headingMd">
                      Preview
                    </Text>
                  </Box>
                  <Box paddingBlockStart={300}>
                    <Text as="h2" variant="headingMd" alignment='center'>
                      Buy more and save
                    </Text>
                  </Box>
                  <Box paddingBlock={150}>
                    <Text as="h2" variant="bodyMd" fontWeight='900'>
                      Apply for all products in store
                    </Text>
                  </Box>

                  <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', textAlign: 'left' }}>Title</th>
                        <th style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', textAlign: 'left' }}>Discount Type</th>
                        <th style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', textAlign: 'right' }}>Quantity</th>
                        <th style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchFields.options?.map((option, index) => (
                        <tr key={index}>
                          <td>{option.title || ''}</td>
                          <td>{option.discountType || ''}</td>
                          <td>{option.quantity || ''}</td>
                          <td>{option.amount ? `${option.amount} ${option.discountType === '%' ? '%' : '$'}` : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            </form>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;
