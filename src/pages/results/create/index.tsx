import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createResult } from 'apiSdk/results';
import { resultValidationSchema } from 'validationSchema/results';
import { AlgorithmInterface } from 'interfaces/algorithm';
import { ExcelDataInterface } from 'interfaces/excel-data';
import { getAlgorithms } from 'apiSdk/algorithms';
import { getExcelData } from 'apiSdk/excel-data';
import { ResultInterface } from 'interfaces/result';

function ResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createResult(values);
      resetForm();
      router.push('/results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ResultInterface>({
    initialValues: {
      result_data: '',
      algorithm_id: (router.query.algorithm_id as string) ?? null,
      excel_data_id: (router.query.excel_data_id as string) ?? null,
    },
    validationSchema: resultValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Results',
              link: '/results',
            },
            {
              label: 'Create Result',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.result_data}
            label={'Result Data'}
            props={{
              name: 'result_data',
              placeholder: 'Result Data',
              value: formik.values?.result_data,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<AlgorithmInterface>
            formik={formik}
            name={'algorithm_id'}
            label={'Select Algorithm'}
            placeholder={'Select Algorithm'}
            fetcher={getAlgorithms}
            labelField={'name'}
          />
          <AsyncSelect<ExcelDataInterface>
            formik={formik}
            name={'excel_data_id'}
            label={'Select Excel Data'}
            placeholder={'Select Excel Data'}
            fetcher={getExcelData}
            labelField={'data'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/results')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'result',
    operation: AccessOperationEnum.CREATE,
  }),
)(ResultCreatePage);
