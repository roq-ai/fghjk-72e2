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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getResultById, updateResultById } from 'apiSdk/results';
import { resultValidationSchema } from 'validationSchema/results';
import { ResultInterface } from 'interfaces/result';
import { AlgorithmInterface } from 'interfaces/algorithm';
import { ExcelDataInterface } from 'interfaces/excel-data';
import { getAlgorithms } from 'apiSdk/algorithms';
import { getExcelData } from 'apiSdk/excel-data';

function ResultEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ResultInterface>(
    () => (id ? `/results/${id}` : null),
    () => getResultById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ResultInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateResultById(id, values);
      mutate(updated);
      resetForm();
      router.push('/results');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ResultInterface>({
    initialValues: data,
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
              label: 'Update Result',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Result
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ResultEditPage);
